import { View } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";
import React from "react";

export default function Books() {
    const [items] = React.useState([
        {
            key: 1,
            name: 'Darkest Darkness',
            category: "Lore Book",
            owned: false, // Change to boolean for checkbox
        },
        {
            key: 2,
            name: 'Battle of Sancre tor',
            category: "Heavy Armor Skill Book",
            owned: true, // Change to boolean for checkbox
        },
    ]);

    return (
        <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>Category</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Owned</DataTable.Title>
                </DataTable.Header>

                {items.map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell style={{ flex: 2 }}>{item.name}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>{item.category}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                            <Checkbox
                                status={item.owned ? 'checked' : 'unchecked'}
                                onPress={() => {

                                }}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    );
}