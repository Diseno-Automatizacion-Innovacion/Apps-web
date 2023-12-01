// import { useRouter } from "next/navigation"

export default function Tema(props: any) {
    // const router = useRouter()
    return (
        <a href={`/foro/${props.id}`}>
            <div id="titulo">{props.title}</div>
            <div id="description">{props.descripcion}</div>
        </a>
    )
}