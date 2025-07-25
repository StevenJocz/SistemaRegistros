import { useState, useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import style from "./ButtonSubmit.module.css";

interface Props {
    id: number;
    onClose: () => void;
    isSubmitting: boolean;
    isLoading: boolean;
}

const ButtonSubmit: React.FC<Props> = ({ id, isSubmitting, isLoading, onClose }) => {
    const [buttonState, setButtonState] = useState<"" | "onclic" | "validate">("");

    useEffect(() => {
        if (isLoading) {

            setButtonState("onclic");
        } else if (buttonState === "onclic") {

            setTimeout(() => {
                setButtonState("validate");

                setTimeout(() => {
                    setButtonState("");
                    onClose();
                }, 1000);
            }, 1250);
        }
    }, [isLoading]);

    return (
        <div className={style.container}>
            <button
                type="submit"
                className={`${style.btn} ${buttonState ? style[buttonState] : ""}`}
                disabled={buttonState === "onclic" || isSubmitting}
            >
                {buttonState === "validate" ? (
                    <IoCheckmarkCircle className={style.Icono} />
                ) : (
                    id === 0 ? "Guardar" : "Actualizar"
                )}
            </button>
        </div>
    );
};

export default ButtonSubmit;
