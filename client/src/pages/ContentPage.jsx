import { useParams } from "react-router-dom"
import { HomePage } from "./Home/HomePage";

export const ContentPage = () => {
    const { contentType } = useParams();
    return <HomePage contentType={contentType}/>
}