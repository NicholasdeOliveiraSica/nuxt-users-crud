
import jsonJobs from '@/assets/listaCBO.json'

export const useJobs = () => {
  const allJobs = jsonJobs
  
  const newJobs = allJobs.map(job => ({
    label: job.name,
    value: job.code
  }))

  return {
    allJobs,
    newJobs
  }
}