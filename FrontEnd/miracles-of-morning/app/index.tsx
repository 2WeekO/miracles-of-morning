import { useNavigation } from "@react-navigation/native";
import { ImageBackground, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import layout_style from "./Style/layout_style";
import SigninPage from "./Auth/SigninPage";
import SignupPage from "./Auth/SignupPage";




function Page() {
  const navigation = useNavigation();
  
  return (
    <ImageBackground source={ require('../assets/images/start_screen_backgrounds.png')} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, flex: 1 }} resizeMode="cover">
      <View style={layout_style.first_screen_container}>
      <View>
        <Text style = {layout_style.title}>Miracles of Morning</Text>
        <Text style={layout_style.subtitle}>기적을 만드는 아침을 경험해보세요</Text>
      </View>
      

      <View>
        <AppButton
          label="회원가입"
          onPress={() => navigation.navigate(SignupPage)}
        />
        <AppButton
          label="기존 계정으로 로그인"
          onPress={() => navigation.navigate(SigninPage)}
        />
      </View>
      
      
    </View>
    </ImageBackground>
  );
}

