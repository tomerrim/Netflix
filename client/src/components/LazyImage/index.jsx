/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react"

export const LazyImage = ({src, alt, onClick, className}) => {
    
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry =>{
                if (entry.isIntersecting){
                    const img = entry.target;
                    img.src = src;
                    observer.disconnect();
                }
            });
        });

        observer.observe(imgRef.current);

        return () => {
            observer.disconnect();
        }
    }, [src])

    return <img ref={imgRef} src={src} alt={alt} onClick={onClick} className={className}/>
    
}