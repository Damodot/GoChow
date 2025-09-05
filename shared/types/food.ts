import { ImageSourcePropType } from "react-native";

type FoodOption = {
    label: string;
    price: string;
};

export type SelectedFoodProps = {
    item: {
        params: {
            food: {
                image: ImageSourcePropType;
                foodName: string;
                foodPrice: string | number;
                foodInfo: string;
                types: {
                    baseFood: FoodOption[];
                    extras: FoodOption[];
                    extraProtein: FoodOption[];
                    drinks: FoodOption[];
                };
            };
        };
    };
};
