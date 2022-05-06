import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet'


import { styles } from './styles';
import { theme } from '../../theme';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Options } from '../Options';
import { Success } from '../Success';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes'

export type FeedbackType = keyof typeof feedbackTypes;
function Widget() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    function handleFeegbackSent() {
        setFeedbackSent(true);
    }
    function handleOpen() {
        bottomSheetRef.current?.expand()
    }

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={handleOpen}
            >
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>
            <BottomSheet
                snapPoints={[1, 280]}
                ref={bottomSheetRef}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {
                    feedbackSent ?
                        <Success onSendAnotherFeedback={handleRestartFeedback} />
                        :
                        <>
                            {
                                feedbackType
                                    ?
                                    <Form
                                        feedbackType={feedbackType}
                                        onFeedbackCanceled={handleRestartFeedback}
                                        onFeedbackSent={handleFeegbackSent}
                                    />
                                    :
                                    <Options onFeedbackTypeChanged={setFeedbackType} />
                            }
                        </>
                }
            </BottomSheet>

        </>
    );
}

export default gestureHandlerRootHOC(Widget);
