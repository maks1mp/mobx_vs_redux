export default function Posts({
    data,
    onRemove = console.log,
    onEdit = console.log
}) {
    return (
        <ul>
            {data.map(d => {
                return (
                    <li key={d.id}>
                        <h5>{d.title}</h5>
                        {d.authorId}
                        <br/>
                        <textarea value={d.text} onChange={(e) => {
                            onEdit(d.id, e.target.value)
                        }}/>

                        <button type="button" onClick={() => onRemove(d.id)}>
                            remove
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
