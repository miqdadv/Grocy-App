import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 export const AnimatedTabIcon = ({name,color,focused}:any)=>{
   const scale  = useSharedValue(1);

   useEffect(()=>{
       scale.value=withSpring(focused?1.4:1);
   },[focused])
1
   const animatedStyle = useAnimatedStyle(()=>({
    transform:[{scale:scale.value}]
   }));

   return (
    <Animated.View style={animatedStyle}>
        <Icon name={name} size={28} color={color}/>
    </Animated.View>
   )
   
}