import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, Image, View } from 'react-native';
import { theme } from '../../theme';
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { styles } from './styles';
import { FeedbackType } from '../Widget'
import { ScreenshotButton } from '../ScreenshotButton'
import { Button } from '../Button'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState('');
    const [screenshot, setScreenshot] = useState<string | null>(null)

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
            .then(uri => setScreenshot(uri))
            .catch(error => console.log(error));
    }
    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return;
        }
        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

        try {
            await api.post('feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })
            onFeedbackSent();
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    return (
        <View
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft weight="bold" size={24} color={theme.colors.text_secondary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={feedbackTypeInfo.image} />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
            </View>


        </View>
    );
}