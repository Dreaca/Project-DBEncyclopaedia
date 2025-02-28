import { View, ScrollView, Button, TouchableOpacity } from "react-native";
import { DataTable,Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {getAllCustomLists} from "../../../reducers/CustomListSlice";
import CustomList from "../../../models/CustomList";
import CustomItem from "../../../models/CustomItem";

export default function CustomLists() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const customLists = useSelector(state => state.custom.customLists)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customLists.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(customLists.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleRowPress = (list:CustomList) => {
        router.push({
            pathname:'display/displayCustomList',
            params: {list:JSON.stringify(list)},
        });
    };
    const handleEdit = (c: CustomList) => {
        if (c.userId === "user"){
            alert("You have permission");
        }else{
            alert("Only the creator can edit the list ! ")
        }
    }

    useEffect(() => {
        dispatch(getAllCustomLists())
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 3, padding: 2 }}>List Name</DataTable.Title>
                        <DataTable.Title style={{ flex: 3, padding: 2 }}>Owner/Creator</DataTable.Title>
                        <DataTable.Title style={{ flex: 2, padding: 2 }}>Votes</DataTable.Title>
                        <DataTable.Title style={{ flex: 1, padding: 2 }}>Edit</DataTable.Title>
                    </DataTable.Header>

                    {currentItems.length > 0 ? (
                        currentItems.map((item:CustomList) => (
                            <DataTable.Row key={item.listId} onPress={() => handleRowPress(item)}>
                                <DataTable.Cell style={{ flex: 3, padding: 2 }}>{item.listName}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 3, padding: 2 }}>{item.userId}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2, padding: 2 }}>{item.votes}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1, padding: 2 }}>
                                    <TouchableOpacity onPress={() => handleEdit(item)}>
                                        <Text>📝</Text>
                                    </TouchableOpacity>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))
                    ) : (
                        <Text>No custom lists available.</Text>
                    )}
                </DataTable>
            </ScrollView>

            {/* Pagination Controls */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Button title="Previous" onPress={handlePreviousPage} disabled={currentPage === 1} />
                <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
                <Button title="Next" onPress={handleNextPage} disabled={currentPage === totalPages} />
            </View>
        </View>
    );
}
