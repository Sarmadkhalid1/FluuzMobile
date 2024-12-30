import { BlurView } from 'expo-blur';
import { View } from 'react-native';

export const Blurred = ({ intensity = 110, tint = 'light', children }) => {
    return (
        <View>
            {children}
            <BlurView
                intensity={intensity}
                tint={tint}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            />
        </View>
    )
}