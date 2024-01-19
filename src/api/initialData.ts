export const getGreeting = async () => {
  const stats = await fetch("http://localhost:4321/trpc/greeting").then((res) =>
    res.json()
  );
  console.log(stats)
  return stats;
};
