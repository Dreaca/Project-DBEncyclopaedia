import { View, Text } from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router";
import CustomList from "../../models/CustomList";
import {DataTable, Checkbox, Banner} from "react-native-paper";
import CustomItem from "../../models/CustomItem";
import React, {useEffect, useState} from "react";

export default function DisplayCustomList() {
    const list = useLocalSearchParams();
    const parseList: CustomList = JSON.parse(list.list);
    const [customItems, setCustomItems] = useState<CustomItem[]>(parseList.customItems);
    const navigation = useNavigation();

    const [visible, setVisible] = useState(true);

    const toggleStatus = (index: number) => {
        const updatedItems = [...customItems];
        updatedItems[index].status = !updatedItems[index].status;
        setCustomItems(updatedItems);
    };
    useEffect(() => {
        navigation.setOptions({ title: parseList.listName });
    }, [navigation, parseList.listName]);
    return (
        <View>
            {visible && (
                <Banner
                    visible={visible}
                    actions={[
                        { label: "Got it", onPress: () => setVisible(false) }
                    ]}
                    icon="information"
                >
                    Only the original creator can modify this list.
                </Banner>
            )}
            <DataTable style={{ marginTop: 20 }}>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 2 }}>Item Name</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                    <DataTable.Title>Extra</DataTable.Title>
                </DataTable.Header>

                {customItems.map((item: CustomItem, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell style={{flex:2}}>{item.itemName}</DataTable.Cell>
                        <DataTable.Cell>
                            <Checkbox
                                status={item.status ? "checked" : "unchecked"}
                                onPress={() => toggleStatus(index)}
                            />
                        </DataTable.Cell>
                        <DataTable.Cell>{item.extra}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    );
}
