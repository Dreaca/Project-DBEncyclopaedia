import React, { useState } from "react";
import { View, TextInput, Modal, StyleSheet } from "react-native";
import { Text, DataTable,Button } from "react-native-paper";

export default function CreateCustomList() {
    const [listName, setListName] = useState(""); // Store the custom list name
    const [items, setItems] = useState([]); // Store the list of items
    const [showModal, setShowModal] = useState(false); // Show or hide modal
    const [newItemName, setNewItemName] = useState(""); // Item name in modal
    const [newItemStatus, setNewItemStatus] = useState(false); // Item status
    const [newItemExtra, setNewItemExtra] = useState(""); // Extra field

    const handleAddItem = () => {
        const newItem = {
            name: newItemName,
            status: newItemStatus ? "Completed" : "Pending", // status is either "Completed" or "Pending"
            extra: newItemExtra
        };
        setItems([...items, newItem]);
        setShowModal(false); // Close modal after adding item
        setNewItemName(""); // Reset modal fields
        setNewItemStatus(false);
        setNewItemExtra("");
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Create Custom List</Text>

            {/* Custom List Name Input */}
            <TextInput
                label="Custom List Name"
                value={listName}
                onChangeText={setListName}
                style={{borderColor:"black",borderWidth:0.5,borderRadius:15}}
                placeholder="Custom List Name"
            />

            {/* Items Table */}
            <DataTable style={{ marginTop: 20 }}>
                <DataTable.Header>
                    <DataTable.Title>Item Name</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                    <DataTable.Title>Extra</DataTable.Title>
                </DataTable.Header>

                {items.map((item, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.status}</DataTable.Cell>
                        <DataTable.Cell>{item.extra}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>

            {/* Add Item Button */}
            <Button mode="outlined" onPress={() => setShowModal(true)}>Add Item + </Button>

            {/* Modal for adding item */}
            <Modal
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Item</Text>

                    {/* Item Name */}
                    <TextInput
                        label="Item Name"
                        value={newItemName}
                        onChangeText={setNewItemName}
                        style={styles.input}
                        placeholder="Enter Item"
                    />

                    {/* Extra Information */}
                    <TextInput
                        label="Extra"
                        value={newItemExtra}
                        onChangeText={setNewItemExtra}
                        style={styles.input}
                        placeholder="Enter Extra Details"
                    />

                    <Button onPress={handleAddItem}
                            textColor="white"
                            style={{borderColor:"lime",borderWidth:2}}
                            >Save Item</Button>
                    <Button onPress={() => setShowModal(false)}
                            textColor="white"
                            style={{marginTop:5,borderWidth:2,borderColor:"red"}}>Cancel</Button>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        width: "50%",
        color: "white",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0.5, 0.2)",
    },
    modal: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white",
    }
});
