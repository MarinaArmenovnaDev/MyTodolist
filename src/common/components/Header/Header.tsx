import styles from "./Header.module.css";
import {FileCheck2} from "lucide-react";
import {Button} from "../Button/Button.tsx";

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <nav className={styles.navigate}>
                <div className={styles.logo}>
                    Todolist
                    <FileCheck2 size={30} color={"white"}/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button className={styles.headerButton}>Sing in</Button>
                    <Button className={styles.headerButton}>Sing up</Button>
                    <Button className={styles.headerButton}>FAQ</Button>
                </div>
            </nav>
        </header>
    )
}
