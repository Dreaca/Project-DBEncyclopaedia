import React, { useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, Alert, SafeAreaView, Animated } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";

const API_KEY = "Ib5SGU8OglOPDcPPO+v8ON8PNGUAfQRtjVkcOdFEQgfJY6H6bI/8--G5/6FoSpLcNkNKCO--sMoJxsPTN10zFFl42Ijj/g=="; // Replace with your Nexus Mods API key
const GAME_DOMAIN = "skyrimspecialedition"; // Change for other games

const ModListScreen = () => {
    const [mods, setMods] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollY = new Animated.Value(0); // Track scroll position

    // Function to fetch mods
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
        outputRange: [50, 0], // Adjust height dynamically
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

            {/* Animated Buttons - Hide on scroll */}
            <Animated.View
                style={{
                    height: buttonContainerHeight,
                    opacity: buttonOpacity,
                    overflow: "hidden",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginBottom: 10, // Adds space when visible, removes when hidden
                }}
            >
                <Button mode="outlined" onPress={() => fetchMods("trending")}>Trending</Button>
                <Button mode="outlined" onPress={() => fetchMods("latest_added")}>Latest Added</Button>
                <Button mode="outlined" onPress={() => fetchMods("latest_updated")}>Latest Updated</Button>
            </Animated.View>

            {/* Loader */}
            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

            {/* Mod List */}
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
