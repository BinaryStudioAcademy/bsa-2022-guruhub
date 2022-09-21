import { FC, FormControlPath } from 'common/types/types';
import { useState } from 'hooks/hooks';

type Props = {
  name: FormControlPath;
  placeholder: string;
  rows: number;
  classes: string;
  field: Record<string, unknown>;
  maxRows?: number;
};

const Textarea: FC<Props> = ({
  name,
  placeholder,
  rows,
  classes,
  field,
  maxRows,
}) => {
  const [textValue, setTextValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(e.target.value);

    if (maxRows) {
      e.target.rows = rows;
      const lineHeight = window.getComputedStyle(e.target).lineHeight;
      const lineHeightValue = Number(
        (lineHeight.match(/\d+/) as Array<string>)[0],
      );
      const currentRows = Math.floor(e.target.scrollHeight / lineHeightValue);
      const newRowCount = currentRows < maxRows ? currentRows : maxRows;
      e.target.rows = newRowCount;
    }
  };

  return (
    <textarea
      {...field}
      name={name}
      placeholder={placeholder}
      className={classes}
      rows={rows}
      value={textValue}
      onChange={handleChange}
    />
  );
};

export { Textarea };
