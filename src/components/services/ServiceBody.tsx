'use client'

import { motion } from 'framer-motion'
import type { Service } from '@/lib/services'

interface ServiceBodyProps {
  service: Service
}

export default function ServiceBody({ service }: ServiceBodyProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Deliverables */}
      <div>
        <h2 className="font-syne font-bold text-lg text-gray-900 mb-4">
          What {service.name} delivers
        </h2>
        <div className="flex flex-col gap-3">
          {service.deliverables.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors flex gap-3"
            >
              <div
                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                style={{ backgroundColor: service.accentBg, color: service.accentText }}
              >
                {service.icon}
              </div>
              <div>
                <p className="text-sm font-sans font-medium text-gray-800">{d.title}</p>
                <p className="text-xs font-sans text-gray-400 mt-0.5 leading-relaxed">
                  {d.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div>
        <h2 className="font-syne font-bold text-lg text-gray-900 mb-4">
          How {service.name} works
        </h2>
        <div className="flex flex-col">
          {service.process.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
              className="flex gap-4 pb-6 border-b last:border-b-0 border-gray-100 pt-4 first:pt-0"
            >
              <div className="w-7 h-7 rounded-full bg-prescript-green text-white flex items-center justify-center text-xs font-sans font-medium flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-sans font-medium text-gray-800">{step.title}</p>
                <p className="text-xs font-sans text-gray-400 mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
