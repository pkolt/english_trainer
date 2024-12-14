import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useGetTagList } from '@/services/tags/hooks';
import { useState } from 'react';
import { orderTagsByAbc } from '@/services/tags/utils';
import { useEffectOnce } from '@/hooks/useEffectOnce';
import { exportWordsToFile } from '@/utils/file';

export const ExportWordsForm = () => {
  const { data: tagList } = useGetTagList({ emptyTag: true });
  const allTagIds = tagList?.map((it) => it.id) ?? [];
  const orderedTagList = tagList ? orderTagsByAbc(tagList) : tagList;
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleTag = (tagId: string) => {
    setTagIds((state) => {
      if (state.includes(tagId)) {
        return state.filter((val) => val !== tagId);
      } else {
        return [...state, tagId];
      }
    });
  };

  const exportWords = async () => {
    setIsDisabled(true);
    try {
      await exportWordsToFile(tagIds);
    } finally {
      setIsDisabled(false);
    }
  };

  useEffectOnce({
    effect: () => {
      setTagIds(allTagIds);
    },
    condition: () => allTagIds.length > 0,
    deps: [allTagIds],
  });

  return (
    <Stack spacing={2} alignItems="start" marginTop={1}>
      <FormControlLabel
        label="Все слова"
        control={<Checkbox checked={tagIds.length === allTagIds.length} onChange={() => setTagIds(allTagIds)} />}
        disabled={isDisabled}
      />
      {orderedTagList?.map((it) => {
        return (
          <FormControlLabel
            key={it.id}
            label={`${it.name} (${it.count})`}
            control={<Checkbox checked={tagIds.includes(it.id)} onChange={() => toggleTag(it.id)} />}
            sx={{ paddingLeft: 4 }}
            disabled={isDisabled}
          />
        );
      })}

      <Button variant="contained" disabled={tagIds.length === 0 || isDisabled} onClick={exportWords}>
        Экспорт
      </Button>
    </Stack>
  );
};
