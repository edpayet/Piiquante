describe('AddSauce', () => {
    it('instance of AddSauce should be define when created', () => {
        const addSauce = new AddSauce();
        expect(addSauce).toBeDefined();
    });
    it('AddSauce should have an execute method', () => {
        const addSauce = new AddSauce();
        expect(addSauce.execute).toBeDefined();
    });
});
