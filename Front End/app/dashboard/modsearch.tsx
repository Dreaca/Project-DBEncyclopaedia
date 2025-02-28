import React, { useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, Alert, SafeAreaView, Animated } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";

const API_KEY = "************************************"; // Replace with  Nexus Mods API key
const GAME_DOMAIN = "skyrimspecialedition";

const ModListScreen = () => {
    const [mods, setMods] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollY = new Animated.Value(0);


    const fetchMods = async (category: string) => {
        setLoading(true);
        const url = `https://api.nexusmods.com/v1/games/${GAME_DOMAIN}/mods/${category}.json`;

        try {
            console.log("Fetching:", url);
            const response = await axios.get(url, {
                headers: { "apikey": API_KEY },
            });

            if (response.data && Array.isArray(response.data)) {
                setMods(response.data);
            } else {
                Alert.alert("Error", "Unexpected response format.");
                setMods([]);
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            Alert.alert("Error", "Failed to fetch mods.");
        } finally {
            setLoading(false);
        }
    };

    const buttonContainerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [50, 0],
        extrapolate: "clamp",
    });

    const buttonOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Browse Mods</Text>


            <Animated.View
                style={{
                    height: buttonContainerHeight,
                    opacity: buttonOpacity,
                    overflow: "hidden",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginBottom: 10,
                }}
            >
                <Button mode="outlined" onPress={() => fetchMods("trending")}>Trending</Button>
                <Button mode="outlined" onPress={() => fetchMods("latest_added")}>Latest Added</Button>
                <Button mode="outlined" onPress={() => fetchMods("latest_updated")}>Latest Updated</Button>
            </Animated.View>


            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

            
            <SafeAreaView>
                <FlatList
                    data={mods}
                    keyExtractor={(item) => item.mod_id.toString()}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    renderItem={({ item }) => (
                        <View style={{ marginVertical: 10, padding: 10, backgroundColor: "#ddd", borderRadius: 5 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                            <Text numberOfLines={2}>{item.summary}</Text>
                            {item.picture_url && (
                                <Image source={{ uri: item.picture_url }} style={{ width: "100%", height: 100, marginTop: 5 }} />
                            )}
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

export default ModListScreen;
