export default function DataTable({
    columns,
    data,
    onEdit,
    onDelete,
    keyField = "id",
    emptyMessage = "No hay registros para mostrar",
}) {
    const hasActions = Boolean(onEdit || onDelete)

    if (!data || data.length === 0){
        return <p className="text-muted fst-italic" >{emptyMessage}</p>
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        {hasActions && <th className="text-end">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row[keyField]}>
                            {columns.map((col) => (
                                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                            ))}
                            {hasActions && (
                                <td className="text-end">
                                    {onEdit && (
                                        <button 
                                        type="button"
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => onEdit(row)}
                                        >
                                            Editar
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onDelete(row)}
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
