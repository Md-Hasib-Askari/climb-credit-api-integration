import { fetchApplications } from "@/api/fetch";
import { Button, Flex, Input, Pagination, Space, Table } from "antd";
import { useEffect, useState } from "react";

const data = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
];
  
  const cols = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (student) => (
        <div>
          { student &&
            student.map((item, key) => (
              <p key={key}>{item}</p>
            ))
          }
        </div>
      )
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
        render: (program) => (
            <div>
            {
                program &&
                program.map((item, key) => (
                <p key={key}>{item}</p>
                ))
            }
            </div>
        )
    },
    {
      title: 'Financing',
      dataIndex: 'financing',
      key: 'financing',
        render: (financing) => (
            <div>
            {
                financing &&
                financing.map((item, key) => (
                <p key={key}>{item}</p>
                ))
            }
            </div>
        )
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
        render: (product) => (
            <div>
            {
                product &&
                product.map((item, key) => (
                <p key={key}>{item}</p>
                ))
            }
            </div>
        )
    },
];

export const ApplicationComponent = ({state}) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataSource, setDataSource] = useState([
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
    ]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        setColumns(cols);
        setDataSource(data);
    }, []);

    useEffect(() => {
        console.log(state);
        const params = {
            page: current,
            limit: pageSize
            // limit: perPageLimit
        };
        fetchApplications(state, params).then((data) => {
            // setDataSource(data);
            console.log(data);
            if (!data?.data) {
                return;
            }
            setTotalRecords(data.data.totalRecords);
            const dataSource = data.data.results.map((item) => {
                return {
                    key: item._id,
                    student: [
                        `${item.customer.firstName} ${item.customer.lastName}`,
                        `${item.application.ref}`,
                        `${item.application.applicationSubmissionDate}`
                    ],
                    program: [
                        `${item.program.name}`,
                        `${item.program.startDate}`,
                        `${item.campus.name}`
                    ],
                    financing: [
                        `${item.product.financeAmt}`,
                        `${item.product.financeAmtTuition}`
                    ],
                    product: [
                        `${item.product.name}`,
                        `${item.product.productType}`,
                        `${item.funding.estimatedFundingDate}`
                    ]
                }
            });
            setDataSource(dataSource);
        });
    }, [state, current, pageSize]);

    return (
        <Flex className="flex flex-col">
            <p>
                Applications that still have outstanding items pending submission or review before Climb can make a decision.
            </p>
            <div>
                <Input placeholder="Search" />
                <Space />
                <Button>Filters</Button>
                <Button type="text">Download</Button>
            </div>
            <div>
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    scroll={{ x: 800, y: 300 }}
                    pagination={false}
                    
                    />
                <Pagination
                    defaultCurrent={current}
                    total={totalRecords}
                    onChange={(page, pageSize) => {
                        setCurrent(page);
                        setPageSize(pageSize);
                    }}
                />
            </div>
        </Flex>
    );
};