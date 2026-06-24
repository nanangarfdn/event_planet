import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Button, Input, Screen} from '../../components';
import {getEvent} from '../../data/mockEvents';
import type {ChatMessage} from '../../domain/types';
import type {AppStackParamList} from '../../navigation/types';
import {filterFoulWords} from '../../utils/filterFoulWords';
import {colors, radius, spacing, typography} from '../../theme';

export function EnquiryChatScreen() {
  const {params} = useRoute<RouteProp<AppStackParamList, 'EnquiryChat'>>();
  const event = getEvent(params.eventId);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {id: 'm0', from: 'organizer', text: 'Hi! How can I help with this event?'},
  ]);

  const send = () => {
    const clean = filterFoulWords(draft.trim());
    if (!clean) {
      return;
    }
    setMessages(prev => [
      ...prev,
      {id: `m${prev.length}`, from: 'me', text: clean},
    ]);
    setDraft('');
  };

  return (
    <Screen padded={false}>
      <Text style={styles.header}>Enquiry · {event?.name ?? 'Event'}</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {messages.map(m => (
          <View
            key={m.id}
            style={[styles.bubble, m.from === 'me' ? styles.mine : styles.theirs]}>
            <Text style={m.from === 'me' ? styles.mineText : styles.theirsText}>
              {m.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.composer}>
        <Input
          placeholder="Type a message"
          value={draft}
          onChangeText={setDraft}
          style={styles.input}
        />
        <Button label="Send" onPress={send} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {...typography.title, color: colors.text, padding: spacing.lg},
  list: {padding: spacing.lg, gap: spacing.sm},
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  mine: {alignSelf: 'flex-end', backgroundColor: colors.primary},
  theirs: {alignSelf: 'flex-start', backgroundColor: colors.surfaceAlt},
  mineText: {...typography.body, color: colors.onPrimary},
  theirsText: {...typography.body, color: colors.text},
  composer: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {flex: 1},
});
