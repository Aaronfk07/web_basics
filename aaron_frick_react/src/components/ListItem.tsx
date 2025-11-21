import React from 'react';

type Props = {
  label: string;
  onClick?: (label: string) => void;
};

const ListItem: React.FC<Props> = ({ label, onClick }) => {
  return (
    <div
      className="list-item"
      role="button"
      tabIndex={0}
      onClick={() => onClick && onClick(label)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick && onClick(label); }}
    >
      {label}
    </div>
  );
};

export default ListItem;
