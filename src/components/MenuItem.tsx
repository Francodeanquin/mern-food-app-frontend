import type { MenuItem } from "../types"; // Importando como un tipo
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem: MenuItem; // Utilizando el tipo directamente
    addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                £{(menuItem.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    );
};

export default MenuItem;
