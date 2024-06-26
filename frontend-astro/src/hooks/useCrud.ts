import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../services/api";

const MySwal = withReactContent(Swal);

type NewItemState<C> = C & { birthDate?: Date }; // Define a type to ensure birthDate exists

const useCrud = <T extends { _id: string; birthDate?: Date }, C extends object>(
  endpoint: string,
  initialData: C
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<NewItemState<C>>(
    initialData as NewItemState<C>
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get(`${endpoint}`, {
          params: { page, pageSize },
        });
        setItems(response.data.list);
      } catch (error) {
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [endpoint, page, pageSize]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "birthDate") {
      setNewItem((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateItem = async () => {
    try {
      await api.post(`${endpoint}`, newItem);
      setShowModal(false);
      MySwal.fire("Success", "Item created successfully!", "success");
      setNewItem(initialData as NewItemState<C>);
      const response = await api.get(`${endpoint}`, {
        params: { page, pageSize },
      });
      setItems(response.data.list);
    } catch (error) {
      setError("Failed to create item.");
    }
  };

  const handleEditItem = (item: T) => {
    setNewItem({
      ...(item as unknown as C),
      birthDate: item.birthDate ? new Date(item.birthDate) : undefined,
    } as NewItemState<C>);
    setCurrentItemId(item._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateItem = async () => {
    if (currentItemId) {
      try {
        await api.put(`${endpoint}/${currentItemId}`, newItem);
        setShowModal(false);
        MySwal.fire("Success", "Item updated successfully!", "success");
        setNewItem(initialData as NewItemState<C>);
        const response = await api.get(`${endpoint}`, {
          params: { page, pageSize },
        });
        setItems(response.data.list);
        setIsEditing(false);
        setCurrentItemId(null);
      } catch (error) {
        MySwal.fire("Error", "Failed to update item.", "error");
      }
    }
  };

  const handleDeleteItem = async (_id: string) => {
    try {
      await api.delete(`${endpoint}/${_id}`);
      const response = await api.get(`${endpoint}`, {
        params: { page, pageSize },
      });
      setItems(response.data.list);
      MySwal.fire("Deleted!", "Item has been deleted.", "success");
    } catch (error) {
      setError("Failed to delete item.");
    }
  };

  return {
    items,
    loading,
    error,
    page,
    pageSize,
    showModal,
    isEditing,
    newItem,
    setPage,
    setShowModal,
    handleInputChange,
    handleCreateItem,
    handleEditItem,
    handleUpdateItem,
    handleDeleteItem,
  };
};

export default useCrud;
