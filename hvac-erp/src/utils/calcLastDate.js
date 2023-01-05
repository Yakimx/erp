export const calcLastDate = (allContracts) => {
  let arrDateMs = allContracts.map((contract) => {
    return Date.parse(
      contract.completionDateContract.split(".").reverse().join(".")
    );
  });

  let max = Math.max.apply(null, arrDateMs);
  return new Date(max).toLocaleDateString().split(".").reverse().join("-");
};
