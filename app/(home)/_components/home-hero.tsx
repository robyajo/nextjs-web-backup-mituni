import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function HomeHero() {
  return (
    <>
       <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className=" mx-auto text-center">
          <Badge className="mb-4 bg-primary text-xs sm:text-sm">
            🚀 Free pickup & delivery
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold  mb-4 sm:mb-6 leading-tight">
            Professional
            <span className="text-primary block">Laundry Service</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            Experience premium laundry care with our eco-friendly cleaning process. Fast, reliable, and delivered right
            to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button
              size="lg"
              className="bg-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Schedule Pickup
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4  w-full sm:w-auto"
            >
              View Pricing
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 px-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">10K+</div>
              <div className=" text-sm sm:text-base">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">24h</div>
              <div className=" text-sm sm:text-base">Express Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">99%</div>
              <div className=" text-sm sm:text-base">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
