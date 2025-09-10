import { ScrollView,View, Text,TextInput ,ImageBackground } from 'react-native';
import auth_style from '../Style/auth_style';
import AppButton from '@/components/AppButton';



export default function SignupPage() {
  return (
    <ImageBackground source={ require('../../assets/images/start_screen_backgrounds.png')} style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, flex: 1 }} resizeMode="cover">
    <ScrollView>
    <View style={auth_style.container}>
      <View><Text style={auth_style.title}>회원가입</Text></View>
      <View>
        <TextInput style={auth_style.input} placeholder="이메일" placeholderTextColor="#000000ff" keyboardType="default" maxLength={30}>
      </TextInput>
      <TextInput style={auth_style.input} placeholder="새로운 비밀번호" placeholderTextColor="#000000ff"  keyboardType="default" secureTextEntry={true} maxLength={20}>
      </TextInput>
      <TextInput style={auth_style.input} placeholder="닉네임" placeholderTextColor="#000000ff"  keyboardType="default" maxLength={10}>
      </TextInput>
      <TextInput style={auth_style.input} placeholder="전화번호" placeholderTextColor="#000000ff"  keyboardType="number-pad" maxLength={11}>
      </TextInput>
      </View>
      <View>
        <AppButton label="가입하기" onPress={() => console.log("회원가입 버튼 클릭됨")}/>
      </View>
      


      

      
    </View>
    </ScrollView>
    </ImageBackground>
  );
}
