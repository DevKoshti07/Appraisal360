declare module 'react-native-progress/Bar' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';

    interface BarProps {
        progress?: number;
        width?: number | null | string;
        color?: string;
        // Add more props if needed
    }

    export default class Bar extends Component<BarProps> { }
}
