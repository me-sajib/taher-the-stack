export const Badge = ({
  variant = 'active'
}) => {
  const variants = {
    active: 'success',
    inactive: 'error',
    checking: 'warning'
  };

  const selectedClass =
    variants[variant.toLowerCase()];

  return (
    <span
      className={`badge badge-outline-${selectedClass}`}
    >
      {variant.toUpperCase()}
    </span>
  );
};
