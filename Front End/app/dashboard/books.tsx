import { View, ScrollView, Button, Text } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../models/Book";
import { AppDispatch } from "../../store/store";
import { getAllBooks, updateBookOwned } from "../../reducers/BookSlice";

export default function Books() {
    const items = useSelector((state) => state.book.books);
    const dispatch = useDispatch<AppDispatch>();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Number of items to display per page

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    const handlePress = (book: Book) => {
        dispatch(updateBookOwned({ id: book._id, owned: !book.owned }));
    };

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Pagination controls
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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 2, padding: 2 }}>Name</DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 2 }}>Category</DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}>Owned</DataTable.Title>
                    </DataTable.Header>

                    {currentItems.map((item: Book) => (
                        <DataTable.Row key={item._id}>
                            <DataTable.Cell style={{ flex: 2, padding: 2 }}>{item.title}</DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 2 }}>{item.category}</DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}>
                                <Checkbox
                                    status={item.owned ? 'checked' : 'unchecked'}
                                    onPress={() => handlePress(item)}
                                />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
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