import { useCallback, useEffect, useState } from "react";

export function useCrud(api) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const extractErrorMessage = (err) => {
    const data = err?.response?.data
    if (data?.errors?.length) return data.errors.map((e) => e.message).join('. ')
    if (data?.message) return data.message
    return err.message || 'Ocurrió un error inesperado'

}

const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
        const { data } = await api.getAll()
        setItems(data)
    } catch (err) {
        setError(extractErrorMessage(err))
    } finally {
        setLoading(false)
        }
    }, [api])


    useEffect(() => {
        fetchAll()
        }, [fetchAll])

    const createItem = async (payload) => {
        const { data } = await api.create(payload)
        await fetchAll()
        return data
    }

    const updateItem = async (id, payload) => {
        const { data } = await api.update(id, payload)
        await fetchAll()
        return data
    }

    const deleteItem = async (id) => {
        await api.remove(id)
        await fetchAll()
    }
    return {
    items,
    loading,
    error,
    fetchAll,
    createItem,
    updateItem,
    deleteItem,
    extractErrorMessage
    }
}
