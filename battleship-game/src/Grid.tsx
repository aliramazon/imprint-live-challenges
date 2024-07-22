import React from "react";

export const Grid = ({ grid, onClick, player, turn }) => {
    const getCellColor = (cellValue) => {
        if (!cellValue) return "";
        if (cellValue === 2) {
            return "green";
        }

        return "red";
    };
    return (
        <div className={`grid ${player === turn ? "disabled" : ""}`}>
            {grid.map((cell, idx) => {
                return (
                    <div
                        key={idx}
                        className={`cell ${getCellColor(cell)}`}
                        onClick={() => onClick(idx)}
                    >
                        {idx}
                    </div>
                );
            })}
        </div>
    );
};
