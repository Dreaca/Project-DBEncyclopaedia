import { View, ScrollView } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../models/Book";
import { AppDispatch } from "../../store/store";
import { getAllBooks } from "../../reducers/BookSlice";

export default function Books() {
    const items = useSelector((state) => state.book.books);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 2, padding: 2 }}>Name</DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 2 }}>Category</DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}>Owned</DataTable.Title>
                    </DataTable.Header>

                    {items.map((item: Book) => (
                        <DataTable.Row key={item._id}>
                            <DataTable.Cell style={{ flex: 2, padding: 2 }}>{item.title}</DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 2 }}>{item.category}</DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}>
                                <Checkbox
                                    status={item.owned ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        // Handle checkbox press
                                    }}
                                />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </View>
    );
}