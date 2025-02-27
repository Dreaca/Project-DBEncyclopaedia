import React, { useState } from "react";
import { View, TextInput, Modal, StyleSheet } from "react-native";
import { Text, DataTable,Button } from "react-native-paper";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import CustomLists from "../../../models/CustomLists";
import {saveCustomList} from "../../../reducers/CustomListSlice";
import CustomItem from "../../../models/CustomItem";
import 'react-native-get-random-values'
import {v4} from 'uuid'
import {navigate} from "expo-router/build/global-state/routing";
import {router} from "expo-router";

export default function CreateCustomList() {
    const dispatch = useDispatch<AppDispatch>();
    const [listName, setListName] = useState(""); // Store the custom list name
    const [items, setItems] = useState([]); // Store the list of items
    const [showModal, setShowModal] = useState(false); // Show or hide modal
    const [newItemName, setNewItemName] = useState(""); // Item name in modal
    const [newItemStatus, setNewItemStatus] = useState(false); // Item status
    const [newItemExtra, setNewItemExtra] = useState(""); // Extra field

    const handleAddItem = () => {
        const newItem:CustomItem = {
            itemName: newItemName,
            status: newItemStatus,
            extra: newItemExtra
        };
        setItems([...items, newItem]);
        setShowModal(false); // Close modal after adding item
        setNewItemName(""); // Reset modal fields
        setNewItemStatus(false);
        setNewItemExtra("");
    };
    const handleSaveCustomList = () => {
        const listId = `LISTID-${v4()}`
        const newList:CustomLists = {
            listId:listId,
            userId:"user",
            listName:listName,
            customItems:items
        }
        dispatch(saveCustomList(newList));
        router.push({pathname:"dashboard/customList/customLists"});
        //EMPTY the PAGE
    }
    const handleDeleteItem = (id: number) => {
        setItems(items.filter((_, index) => index !== id));
    };


    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Create Custom List</Text>

            <TextInput

                value={listName}
                onChangeText={setListName}
                style={{borderColor:"black",borderWidth:0.5,borderRadius:15,paddingHorizontal:15}}
                placeholder="Custom List Name"
            />


            {/* Items Table */}
            <DataTable style={{ marginTop: 20 }}>
                <DataTable.Header>
                    <DataTable.Title style={{flex:2}}>Item Name</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                    <DataTable.Title>Extra</DataTable.Title>
                    <DataTable.Title> </DataTable.Title>
                </DataTable.Header>

                {items.map((item:CustomItem, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.itemName}</DataTable.Cell>
                        <DataTable.Cell>{item.status}</DataTable.Cell>
                        <DataTable.Cell>{item.extra}</DataTable.Cell>
                        <DataTable.Cell numeric onPress={()=>handleDeleteItem(index)}>❌</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>


            <Button mode="outlined" onPress={() => setShowModal(true)}>Add Item + </Button>
            <Button mode="outlined" style={{marginTop:20}} onPress={()=>handleSaveCustomList()}>Save Custom List</Button>


            <Modal
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Item</Text>

                    <TextInput

                        value={newItemName}
                        onChangeText={setNewItemName}
                        style={styles.input}
                        placeholder="Enter Item"
                    />


                    <TextInput

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
        backgroundColor: "gray",
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
    },

});
