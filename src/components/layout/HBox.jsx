export const HBox = ({ children, gap, styles }) => {
  return <div style={{ display: 'flex', flexDirection: 'row', gap, ...styles }}>{children}</div>;
};
