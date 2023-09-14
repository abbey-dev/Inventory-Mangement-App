import React from "react";

interface IProps {
  active: boolean;
  children: React.ReactNode;
}

export default function Index({ active, children }: IProps) {
  return (
    <React.Fragment>
      {active ? (
        <React.Fragment>
          <div className="fixed inset-0 flex items-center z-50 bg-[#e1e9fa] bg-opacity-40 justify-center">
            {children}
          </div>
        </React.Fragment>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
