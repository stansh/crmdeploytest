import React, { useEffect, useState, useRef } from 'react';



export function KpiCom({kpiName,kpiValue}) {
    return (
        <div className="kpiCard w-100">
            <div className="d-inline-block w-75 align-middle px-1 py-1 px-md-3 py-md-4">
                <h2 className="fs-sm-6">{kpiValue}</h2>
                <span>{kpiName}</span>
            </div>
            <div className="w-25 d-inline-block align-middle">
                <i class="bi bi-bar-chart-fill " ></i>
            </div>
        </div>
        
    );
}