export default function Tema(props: any) {
    return (
        <a href={`/foro/${props.id}`}>
            <div id="titulo">{props.title}</div>
            <div id="description">{props.descripcion}</div>
        </a>
    )
}