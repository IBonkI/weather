export const VBox = ({ children, styles }) => {
  return <div style={{ display: 'flex', flexDirection: 'column', ...styles }}>{children}</div>;
};
