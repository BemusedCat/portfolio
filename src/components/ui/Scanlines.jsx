import useViewMode from '../../hooks/useViewMode';

export default function Scanlines() {
  const { isModernView } = useViewMode();

  if (!isModernView) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.03) 2px,
          rgba(0, 0, 0, 0.03) 4px
        )`,
      }}
    />
  );
}
