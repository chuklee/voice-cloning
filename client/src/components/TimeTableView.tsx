import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function TimeTableView({ timetable }: any) {
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isStudentGroupOpen, setIsStudentGroupOpen] = useState(false);

  const toggleRoom = () => setIsRoomOpen(!isRoomOpen);
  const toggleTeacher = () => setIsTeacherOpen(!isTeacherOpen);
  const toggleStudentGroup = () => setIsStudentGroupOpen(!isStudentGroupOpen);

  const renderTable = (data: any) => (
    <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden p-4 m-2 border-2 border-gray-500 shadow-lg">
      <thead className="bg-gray-50">
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row: any, index: number) => (
          <tr key={index}>
            {Object.values(row).map((value: any, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex space-x-4">
      <Tabs defaultValue="byRoom" className="w-fit justify-center flex flex-col items-center">
        <TabsList className='w-fit'>
          <div className='w-fit'>
            <TabsTrigger value="byRoom">By Room</TabsTrigger>
            <TabsTrigger value="byTeacher">By Teacher</TabsTrigger>
            <TabsTrigger value="byStudentGroup">By Student Group</TabsTrigger>
          </div>
        </TabsList>
        <div>
          <TabsContent value="byRoom">{renderTable(timetable.byRoom)}</TabsContent>
          <TabsContent value="byTeacher">{renderTable(timetable.byTeacher)}</TabsContent>
          <TabsContent value="byStudentGroup">{renderTable(timetable.byStudentGroup)}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};