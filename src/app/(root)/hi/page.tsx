const Hi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>Hi</div>
  );
};

export default Hi