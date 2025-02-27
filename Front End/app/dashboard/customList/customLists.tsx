import { View, ScrollView, Button, TouchableOpacity } from "react-native";
import { DataTable,Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function CustomLists() {
    const router = useRouter();

    // Sample customLists array for testing
    const customLists = [
        {
            listId: "01",
            listName: "Custom List 1",
            creator: "Custom Creator 1",
        },
        {
            listId: "02",
            listName: "Custom List 2",
            creator: "Custom Creator 2",
        },
        // Add more items for testing pagination
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // Number of items to display per page for testing

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

    const handleRowPress = (listId: string) => {
        // Navigate to another page when a row is pressed
        // router.push(`/customLists/${listId}`); // Adjust path according to your setup
        console.log("Row pressed ")
    };

    useEffect(() => {
        console.log("Current Items:", currentItems); // Check the sliced items
        console.log("Total Pages:", totalPages); // Check the pagination
    }, [currentItems, totalPages]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 3, padding: 2 }}>List Name</DataTable.Title>
                        <DataTable.Title style={{ flex: 2, padding: 2 }}>Owner/Creator</DataTable.Title>
                        <DataTable.Title style={{ flex: 1, padding: 2 }}>Edit</DataTable.Title>
                    </DataTable.Header>

                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <DataTable.Row key={item.listId} onPress={() => handleRowPress(item.listId)}>
                                <DataTable.Cell style={{ flex: 3, padding: 2 }}>{item.listName}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2, padding: 2 }}>{item.creator}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1, padding: 2 }}>
                                    <TouchableOpacity onPress={() => alert("Edit button pressed")}>
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
