import isSameWeek from 'date-fns/is_same_week'
import subWeeks from 'date-fns/sub_weeks'
import addWeeks from 'date-fns/add_weeks'
import isWithinRange from 'date-fns/is_within_range'
import endOfWeek from 'date-fns/end_of_week'

export const getJobs = ({
    email,
    users,
    jobs,
    filter,
    phases,
    projects
}) => {
    const user = users.filter(u => u.email === email && !u.isArchived)[0] || {}
    const now = new Date()
    const lastWeek = subWeeks(now, 1)
    const nextWeek = addWeeks(now, 1)

    return jobs
        .map(job => {
            const phase = phases.filter(p => p.id === job.phaseId)[0] || {}
            const project = projects.filter(p => p.id === phase.projectId)[0] || {}
            return {
                ...job,
                phase,
                project
            }
        })
        .filter(job => job.userId === user.id && !job.isArchived)
        .filter(job => {
            if(filter.status === 'OPEN') {
                return job.isDone === false
            } else if(filter.status === 'DONE') {
                return job.isDone === true
            }

            return true
            
        })
        .filter(job => {
            if(filter.span === 'WEEK') {
                const inRangeAndNotDone = (job) => {
                    return isWithinRange(
                        job.deadlineAt, 
                        '1970-01-01', 
                        endOfWeek(lastWeek, {weekStartsOn: 1})
                    ) && !job.isDone
                }
                
                if(filter.status === 'OPEN' || filter.status === 'ALL') {
                    return isSameWeek(job.deadlineAt, now, {weekStartsOn: 1}) || inRangeAndNotDone(job)
                } else {
                    return isSameWeek(job.deadlineAt, now, {weekStartsOn: 1})
                }
            }

            if(filter.span === 'LAST_WEEK') {
                return isSameWeek(job.deadlineAt, lastWeek, {weekStartsOn: 1})
            }

            if(filter.span === 'NEXT_WEEK') {
                return isSameWeek(job.deadlineAt, nextWeek, {weekStartsOn: 1})
            }

            return true
        })
        .sort((a, b) => {
            if(a.deadlineAt < b.deadlineAt) return -1
            return 1
        })
        .reduce((acc, job) => {
            const isOlder = isWithinRange(
                job.deadlineAt, 
                '1970-01-01', 
                endOfWeek(lastWeek, {weekStartsOn: 1})
            )

            if(isOlder) {
                return {
                    ...acc,
                    older: [
                        ...acc.older,
                        job
                    ]
                }
            } else {
                return {
                    ...acc,
                    current: [
                        ...acc.current,
                        job
                    ]
                }
            }
        }, {
            current: [],
            older: []
        })
}

export const getIndex = (state, field, id) => {
    return state[field].map(e => e.id).indexOf(id)
} 