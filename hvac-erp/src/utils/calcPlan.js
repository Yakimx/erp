export const calcPlan = (contracts) => {
  let dateStr = new Date().toLocaleDateString();
  let doc = [];
  let res = [
    {
      date: "2023-12-12",
      listPlan: [
        {
          products: [],
        },
      ],
    },
  ];
  // roduct.quantity
  contracts.map((contract) => {
    contract.products.map((roduct) => {
      for (let i = 1; i <= 1; i++) {
        doc.push({
          contractNumber: contract.contractNumber,
          name: roduct.name,
          quantityAll: roduct.quantity,
          quantityMade: 0,
          quantityMadeToday: 0,
          quantityRequired: roduct.quantity,
        });
      }
    });
  });

  res[0].listPlan[0].products = doc;
  console.log(res);
  return res;
};

// let res = [
//   {
//     date: "2023-12-12",
//     listPlan: [
//       {
//         contractNumber: 999,

//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "2023-12-12",
//     listPlan: [
//       {
//         contractNumber: 999,
//         products: [
//           {
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//     ],
//   },
// ];

// let res = [
//   {
//     date: "2023-12-12",
//     listPlan: [
//       {
//         products: [
//           {
//             contractNumber: 999,
//             name: "ВКК-100",
//             quantityAll: 5,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 4,
//           },
//           {
//             contractNumber: 999,
//             name: "ВР80-75",
//             quantityAll: 10,
//             quantityMade: 2,
//             quantityMadeToday: 6,
//             quantityRequired: 10,
//           },
//         ],
//       },
//     ],
//   },
// ];
