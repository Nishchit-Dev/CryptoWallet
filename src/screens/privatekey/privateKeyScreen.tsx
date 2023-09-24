import {  View } from "tamagui"
import { CreateNewWallet } from "../Signin/createNewWallet"

export const PrivateKeyScreen = ({navigation}) =>{
    return(
        <View>
            <CreateNewWallet navigation={navigation}/>
        </View>
    )
}