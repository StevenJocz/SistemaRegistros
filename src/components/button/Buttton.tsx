import styles from './Button.module.css'

interface Props {
    type: number;
    text: string;
    onClick?: () => void;
}


const Button = ({ type, text , onClick}: Props) => {
    return (
        <div className={styles.Button}>
            {type === 1 ? (
                <button
                    className={styles.Primary}
                    type="submit"
                    >
                    {text}
                    
                </button>
            ) : (
                <button
                    className={styles.Secondary}
                   onClick={onClick}
                   >
                    {text}
                    
                </button>
            )}
        </div>
    );
}

export default Button;