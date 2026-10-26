import type { Filter } from "../types";

type Props = {
  filter: Filter;
  onChange: (filter: Filter) => void;
};

const OPTIONS: ReadonlyArray<{ value: Filter; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "done", label: "Feitas" },
];

function TaskFilter({ filter, onChange }: Props) {
  return (
    <div className="task-filter">
      {OPTIONS.map((option) => {
        const isActive = option.value === filter;
        const buttonClassName = isActive
          ? "task-filter__button task-filter__button--active"
          : "task-filter__button";
        const handleClick = () => onChange(option.value);

        return (
          <button
            key={option.value}
            type="button"
            className={buttonClassName}
            onClick={handleClick}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default TaskFilter;
