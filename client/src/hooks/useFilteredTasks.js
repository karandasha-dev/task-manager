const useFilteredTasks = ({
  list,
  filterStatus,
  searchQuery,
  filterPriority,
}) => {
  return list.filter((task) => {
    const search = searchQuery.toLowerCase();

    const matchesResult = String(task.title || "")
      .toLowerCase()
      .includes(search);
    const matchesStatus = filterStatus === "" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "" || task.priority === filterPriority;

    return matchesResult && matchesStatus && matchesPriority;
  });
};

export default useFilteredTasks;
